using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly TareasDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(TareasDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Usuario login)
    {
        // Buscar usuario en DB
        var user = _context.usuarios.SingleOrDefault(u => u.usuario == login.usuario);

        // Verificar usuario y contraseña
        if (user == null || !BCrypt.Net.BCrypt.Verify(login.password, user.password))
            return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });

        // Crear token JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Name, user.usuario)
            }),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpiresInMinutes"])),
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new { token = tokenHandler.WriteToken(token) });
    }
}

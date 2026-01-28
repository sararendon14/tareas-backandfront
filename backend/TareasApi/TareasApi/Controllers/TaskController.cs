using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TareasController : ControllerBase
{
    private readonly TareasDbContext _context;

    public TareasController(TareasDbContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetTareas()
    {
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value);
        var tareas = await _context.tareas
            .Where(t => t.usuario_id == userId)
            .ToListAsync();

        return Ok(tareas);
    }

    
    [HttpPost]
    public async Task<IActionResult> CrearTarea([FromBody] Tarea tarea)
    {
        tarea.usuario_id = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value);
        _context.tareas.Add(tarea);
        await _context.SaveChangesAsync();
        return Ok(tarea);
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditarTarea(int id, [FromBody] Tarea tarea)
    {
        var tareaExistente = await _context.tareas.FindAsync(id);
        if (tareaExistente == null) return NotFound();

        tareaExistente.titulo = tarea.titulo;
        tareaExistente.descripcion = tarea.descripcion;
        tareaExistente.completada = tarea.completada;

        await _context.SaveChangesAsync();
        return Ok(tareaExistente);
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarTarea(int id)
    {
        var tarea = await _context.tareas.FindAsync(id);
        if (tarea == null) return NotFound();

        _context.tareas.Remove(tarea);
        await _context.SaveChangesAsync();
        return Ok(new { mensaje = "Tarea eliminada" });
    }
}

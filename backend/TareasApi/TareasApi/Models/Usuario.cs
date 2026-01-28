using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Usuario
{
    [Key]
    public int id { get; set; }

    [Required]
    public string usuario { get; set; }

    [Required]
    [Column("contraseña")] 
    public string password { get; set; } 
}



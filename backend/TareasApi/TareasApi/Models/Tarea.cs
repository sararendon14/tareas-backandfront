using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tarea
{
    [Key]
    public int id { get; set; }

    [Required]
    public string titulo { get; set; }

    public string descripcion { get; set; }

    public bool completada { get; set; } = false;

   
    [ForeignKey("Usuario")]
    public int usuario_id { get; set; }

    public Usuario Usuario { get; set; }
}



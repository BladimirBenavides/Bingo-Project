using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BingoController : ControllerBase
{
    private readonly BingoGame _bingoGame;

    public BingoController(BingoGame bingoGame)
    {
        _bingoGame = bingoGame;
    }

    [HttpGet("siguiente-numero")]
    public IActionResult ObtenerSiguienteNumero()
    {
        int numero = _bingoGame.ObtenerSiguienteNumero();
        
        if (numero == -1)
        {
            return Ok(new { 
                exito = false, 
                mensaje = "Ya no hay más números disponibles" 
            });
        }

        return Ok(new { 
            exito = true, 
            numero = numero,
            cantidadNumeros = _bingoGame.ObtenerCantidadNumeros()
        });
    }

    [HttpPost("reiniciar")]
    public IActionResult Reiniciar()
    {
        _bingoGame.Reiniciar();
        return Ok(new { 
            exito = true, 
            mensaje = "Juego reiniciado" 
        });
    }

    [HttpGet("numeros-usados")]
    public IActionResult ObtenerNumerosUsados()
    {
        return Ok(new { 
            numeros = _bingoGame.ObtenerNumerosUsados(),
            cantidad = _bingoGame.ObtenerCantidadNumeros()
        });
    }

    [HttpGet("ultimo-numero")]
    public IActionResult ObtenerUltimoNumero()
    {
        return Ok(new { 
            numero = _bingoGame.ObtenerUltimoNumero() 
        });
    }
}
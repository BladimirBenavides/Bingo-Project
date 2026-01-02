var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<BingoGame>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();

public class BingoGame
{
    private HashSet<int> numerosUsados = new HashSet<int>();
    private int ultimoNumero = 0;
    private Random random = new Random();
    private const int NUMERO_MAXIMO = 75; // Cambia a 90 si prefieres bingo de 90 números

    public int ObtenerSiguienteNumero()
    {
        if (numerosUsados.Count >= NUMERO_MAXIMO)
        {
            return -1; // Ya no hay más números
        }

        int numero;
        do
        {
            numero = random.Next(1, NUMERO_MAXIMO + 1);
        } while (numerosUsados.Contains(numero));

        numerosUsados.Add(numero);
        ultimoNumero = numero;
        return numero;
    }

    public void Reiniciar()
    {
        numerosUsados.Clear();
        ultimoNumero = 0;
    }

    public List<int> ObtenerNumerosUsados()
    {
        return numerosUsados.OrderBy(n => n).ToList();
    }

    public int ObtenerUltimoNumero()
    {
        return ultimoNumero;
    }

    public int ObtenerCantidadNumeros()
    {
        return numerosUsados.Count;
    }
}
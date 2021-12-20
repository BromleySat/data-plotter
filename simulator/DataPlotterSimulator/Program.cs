var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
var deviceId = Guid.NewGuid().ToString("N");

var random = new Random();

string RandomString(int length)
{
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
}

app.MapGet("/data", () =>
{
    return new DataRecord
    (
        deviceId,
        DateTime.UtcNow,
        Random.Shared.Next(-20, 55)
    );
});

app.MapGet("/random-data", () =>
{
    return new Dictionary<string, object>()
    {
        { "deviceId", deviceId },
        { RandomString(6) , Random.Shared.Next(-290, 585) },
        { RandomString(6), Random.Shared.Next(-290, 585) },
        { RandomString(6) , Random.Shared.Next(-290, 585) }

    };
});

app.Run();

internal record DataRecord(string deviceId, DateTime Date, int TemperatureC)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}



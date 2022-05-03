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


var columnCount = Random.Shared.Next(2, 5);
var columnNames = new List<string>();
for (int i = 0; i < columnCount; i++)
{
    columnNames.Add(RandomString(6));
}

app.MapGet("/random-data", () =>
{
    var response = new Dictionary<string, object>()
    {
        { "deviceId", deviceId },
    };

    foreach (var column in columnNames)
    {
        response.Add(column, Random.Shared.Next(-290, 585));
    }

    return response;
});

app.Run();

internal record DataRecord(string deviceId, DateTime Date, int TemperatureC)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}



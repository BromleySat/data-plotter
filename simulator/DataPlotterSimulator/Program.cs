var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("*");
        });
});

var app = builder.Build();
var deviceId = Guid.NewGuid().ToString("N");

var random = new Random();

app.UseCors();

string RandomString(int length)
{
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
}

app.MapGet("/api/config", () =>
{
    Thread.Sleep(10000);
    return new DeviceIdAndVersion
    (
        deviceId: "Simulator-NET-Local",
        version: "v.1.0.0"
    );
});

app.MapGet("/api/data", () =>
{
    Thread.Sleep(10000);
    return new DataRecord
    (
        DateTime.UtcNow,
        Random.Shared.Next(-20, 55)
    );
});


var columnCount = Random.Shared.Next(3, 5);
var columnNames = new List<string>();
for (int i = 0; i < columnCount; i++)
{
    columnNames.Add(RandomString(6));
}

app.MapGet("/api/random-data", () =>
{
    var response = new Dictionary<string, object>()
    {
        
    };

    foreach (var column in columnNames)
    {
        response.Add(column, Random.Shared.Next(-290, 585));
    }

    return response;
});

app.Run();

internal record DataRecord(DateTime Date, int TemperatureC)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

internal record DeviceIdAndVersion(string deviceId, string version);




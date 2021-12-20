var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
var deviceId = Guid.NewGuid().ToString("N");

app.MapGet("/data", () =>
{
    var data =
       new DataRecord
       (
           deviceId,
           DateTime.UtcNow,
           Random.Shared.Next(-20, 55)
       );
    return data;
})
.WithName("GetData");

app.Run();

internal record DataRecord(string deviceId, DateTime Date, int TemperatureC)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
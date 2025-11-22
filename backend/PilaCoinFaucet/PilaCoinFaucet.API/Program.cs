using Microsoft.AspNetCore.HttpLogging;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add HTTP logging
builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields = HttpLoggingFields.RequestPath |
                           HttpLoggingFields.RequestMethod |
                           HttpLoggingFields.ResponseStatusCode |
                           HttpLoggingFields.Duration;
});

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PilaCoin Faucet API",
        Version = "v1",
        Description = "API for PilaCoin Faucet operations",
        Contact = new OpenApiContact
        {
            Name = "Éderson Fernandes",
            Email = "efernandes.tech@gmail.com"
        }
    });
});

var app = builder.Build();

// Use HTTP logging middleware
app.UseHttpLogging();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PilaCoin Faucet API v1");
        c.RoutePrefix = string.Empty; // Makes Swagger available at root
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

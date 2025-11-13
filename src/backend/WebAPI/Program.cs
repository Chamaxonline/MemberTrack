using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using WebAPI;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Allow all origins
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
    builder =>
    {
        builder.AllowAnyOrigin() // Allow requests from any origin
               .AllowAnyHeader() // Allow any headers
               .AllowAnyMethod(); // Allow any HTTP methods
    });
});

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IMemberService, MemberService>();
// Add controllers
builder.Services.AddControllers();


// Add Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Member Track API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Member Track API v1");
    });
}

// Use CORS middleware
app.UseCors(MyAllowSpecificOrigins); // Enable CORS for all endpoints

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
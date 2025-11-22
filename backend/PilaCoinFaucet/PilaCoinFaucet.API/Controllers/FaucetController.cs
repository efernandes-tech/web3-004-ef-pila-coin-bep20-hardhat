using Microsoft.AspNetCore.Mvc;

namespace PilaCoinFaucet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FaucetController : ControllerBase
{
    private readonly ILogger<FaucetController> _logger;

    public FaucetController(ILogger<FaucetController> logger)
    {
        _logger = logger;
    }

    [HttpGet("status")]
    public ActionResult<object> GetStatus()
    {
        return Ok(new
        {
            Status = "Active",
            Message = "PilaCoin Faucet is running",
            Timestamp = DateTime.UtcNow
        });
    }

    [HttpPost("mint/{wallet}")]
    public ActionResult<object> Mint(string wallet)
    {
        _logger.LogInformation("Mint request received for wallet: {Wallet}", wallet);

        return Ok(new
        {
            Success = true,
            Message = "Coins minted successfully",
            Timestamp = DateTime.UtcNow
        });
    }
}

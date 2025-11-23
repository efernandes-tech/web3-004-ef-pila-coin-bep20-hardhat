using Microsoft.AspNetCore.Mvc;
using PilaCoinFaucet.API.Services;

namespace PilaCoinFaucet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FaucetController : ControllerBase
{
    private readonly ILogger<FaucetController> _logger;
    private readonly Web3Service _web3Service;

    public FaucetController(ILogger<FaucetController> logger,
        Web3Service web3Service)
    {
        _logger = logger;
        _web3Service = web3Service;
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
        try
        {
            _logger.LogInformation("Mint request received for wallet: {Wallet}", wallet);

            var tx = _web3Service.MintAndTransfer(wallet);

            return Ok(new
            {
                Success = tx,
                Message = "Coins minted successfully",
                Timestamp = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error mint");
            return StatusCode(500, "Error mint");
        }
    }
}

namespace PilaCoinFaucet.API.Providers;

public class Web3Provider
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<Web3Provider> _logger;

    public Web3Provider(IConfiguration configuration, ILogger<Web3Provider> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public string MintAndTransfer(string to)
    {
        return "Hello World";
    }
}

using PilaCoinFaucet.API.Providers;

namespace PilaCoinFaucet.API.Services;

public class Web3Service
{
    private readonly Web3Provider _web3Provider;
    private readonly ILogger<Web3Service> _logger;

    public Web3Service(Web3Provider web3Provider, ILogger<Web3Service> logger)
    {
        _web3Provider = web3Provider;
        _logger = logger;
    }

    public bool MintAndTransfer(string to)
    {
        var result = _web3Provider.MintAndTransfer(to);

        return !string.IsNullOrEmpty(result);
    }
}

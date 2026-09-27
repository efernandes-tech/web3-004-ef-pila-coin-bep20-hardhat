using System.Numerics;
using Nethereum.ABI.FunctionEncoding;
using Nethereum.Contracts;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;

namespace PilaCoinFaucet.API.Providers;

public class Web3Provider
{
    private static readonly BigInteger TransferAmount = 10000;

    private readonly IConfiguration _configuration;
    private readonly ILogger<Web3Provider> _logger;

    public Web3Provider(IConfiguration configuration, ILogger<Web3Provider> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<string> MintAndTransfer(string to)
    {
        var account = new Account(Environment.GetEnvironmentVariable("PRIVATE_KEY"));
        var web3 = new Web3(account, Environment.GetEnvironmentVariable("NODE_URL"));
        web3.TransactionManager.UseLegacyAsDefault = true;

        var abi = await File.ReadAllTextAsync(Path.Combine(AppContext.BaseDirectory, "Resources", "abi.json"));
        var contract = web3.Eth.GetContract(abi, Environment.GetEnvironmentVariable("CONTRACT_ADDRESS"));
        var from = Environment.GetEnvironmentVariable("WALLET");

        try
        {
            var mint = contract.GetFunction("mint");
            var mintGas = await mint.EstimateGasAsync(from, null, null, to);
            await mint.SendTransactionAndWaitForReceiptAsync(from, mintGas, null, null, to);
        }
        catch (SmartContractRevertException ex)
        {
            _logger.LogError("Mint reverted: {Reason}", ex.RevertMessage);
            throw;
        }
        catch (SmartContractCustomErrorRevertException ex)
        {
            _logger.LogError("Mint reverted with custom error: {Data}", ex.ExceptionEncodedData);
            throw;
        }

        var transfer = contract.GetFunction("transfer");
        var transferGas = await transfer.EstimateGasAsync(from, null, null, to, TransferAmount);
        var receipt = await transfer.SendTransactionAndWaitForReceiptAsync(from, transferGas, null, null, to, TransferAmount);

        _logger.LogInformation("Transferred {Amount} to {To}, tx {Hash}", TransferAmount, to, receipt.TransactionHash);

        return receipt.TransactionHash;
    }
}

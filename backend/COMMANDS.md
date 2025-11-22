# Commands:

```cmd
mkdir ./backend/PilaCoinFaucet
cd ./backend/PilaCoinFaucet

dotnet new sln -n PilaCoinFaucet
dotnet new webapi -n PilaCoinFaucet.API
dotnet sln add PilaCoinFaucet.API/PilaCoinFaucet.API.csproj

dotnet dev-certs https --trust
dotnet sln list
dotnet build

cd PilaCoinFaucet.API
dotnet run --launch-profile https

dotnet add package Swashbuckle.AspNetCore
```

```cmd
cd ./backend/PilaCoinFaucet/PilaCoinFaucet.API
dotnet watch
```

```cmd

```

```cmd

```

```cmd

```

```cmd

```

```cmd

```

```cmd

```

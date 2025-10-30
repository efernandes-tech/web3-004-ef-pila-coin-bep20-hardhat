FROM sonarqube:lts-community

USER root

# Install .NET SDK and Node.js for scanning .NET and React TypeScript projects
RUN apt-get update && \
    apt-get install -y wget curl && \
    wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    rm packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y dotnet-sdk-8.0 && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER sonarqube

EXPOSE 9000

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WealthSentinels.api.csproj", "./"]
RUN dotnet restore "WealthSentinels.api.csproj"
COPY . .
RUN dotnet build "WealthSentinels.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WealthSentinels.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Render provides PORT environment variable - use it
ENV ASPNETCORE_ENVIRONMENT=Production

# Use the PORT environment variable from Render, fallback to 8080
CMD ASPNETCORE_URLS=http://*:${PORT:-8080} dotnet WealthSentinels.api.dll
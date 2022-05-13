# Frontend
FROM node:latest as build-frontend
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY Frontend/webportal/package.json .
RUN npm install
COPY Frontend/webportal .
RUN npm run build

# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY Backend/CharacterSheet.Models/CharacterSheet.Models.csproj CharacterSheet.Models/
RUN dotnet restore CharacterSheet.Models/CharacterSheet.Models.csproj
COPY Backend/CharacterSheet.DataAccess/CharacterSheet.DataAccess.csproj CharacterSheet.DataAccess/
RUN dotnet restore CharacterSheet.DataAccess/CharacterSheet.DataAccess.csproj
COPY Backend/CharacterSheet.WebApi/CharacterSheet.WebApi.csproj CharacterSheet.WebApi/
RUN dotnet restore CharacterSheet.WebApi/CharacterSheet.WebApi.csproj

# Copy everything else and build
COPY Backend/ .
WORKDIR /src/CharacterSheet.WebApi
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS http://*:80
EXPOSE 80
COPY --from=build-env /src/CharacterSheet.WebApi/out .
COPY --from=build-frontend /usr/src/app/build ./wwwroot
ENTRYPOINT ["dotnet", "CharacterSheet.WebApi.dll"]

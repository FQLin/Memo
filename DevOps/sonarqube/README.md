# [SonarScanner for .NET](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner-for-dotnet)

根据 [`collaboration between SonarSource and Microsoft`](https://www.sonarsource.com/blog/easy-analysis-of-visual-studio-solutions-with-the-sonarqube-scanner-for-msbuild/?_gl=1*14f8x8*_gcl_au*NTIyNzIzODQuMTY5MDI1MjI4NA..*_ga*MTYyMjMxMzMuMTY2NzgwMDM5MQ..*_ga_9JZ0GZ5TC6*MTY5MDI2NDQ0Mi45LjEuMTY5MDI2ODU3MC42MC4wLjA.) 推荐使用`.net SonarScanner` 分析`MSBuild`或`dotnet`项目。

通过编辑 `<INSTALL_DIRECTORY>/SonarQube.Analysis.xml`文件配置全局设置：
``` xml
<SonarQubeAnalysisProperties  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.sonarsource.com/msbuild/integration/2015/1">
  <Property Name="sonar.host.url">http://localhost:9000</Property>
  <Property Name="sonar.token">[my-user-token]</Property>
</SonarQubeAnalysisProperties>
```

## `.NET Core global tool`
``` powershell
# https://www.nuget.org/packages/dotnet-sonarscanner
# .NET Core 2.1+ 可用
dotnet tool install --global dotnet-sonarscanner --version x.x.x

# 使用方法


dotnet build <path to project file or .sln file>
dotnet <path to SonarScanner.MSBuild.dll> end /d:sonar.token="<token>" 
```
### 使用方法
#### [`begin`](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner-for-dotnet/#begin)
add `begin` command line argument for the hooks into the build pipeline, downloads SonarQube quality profiles and settings, and prepares your project for analysis.

``` powershell
dotnet <path to SonarScanner.MSBuild.dll> begin /k:"project-key" /d:sonar.token="<token>"
```
#### `Build`
[`.Net test coverage`](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/test-coverage/dotnet-test-coverage/)

#### `End`

## 排除项目
``` xml
<!-- in .csproj –->
<PropertyGroup>
  <!-- Exclude the project from analysis -->
  <SonarQubeExclude>true</SonarQubeExclude>
</PropertyGroup>
```

## 高级主题
### [测试项目检测](https://github.com/SonarSource/sonar-scanner-msbuild/wiki/Analysis-of-product-projects-vs.-test-projects)
### 每个项目分析参数
可以通过 .csproj 文件设置。

``` xml
<!-- in .csproj -->
<ItemGroup>
  <SonarQubeSetting Include="sonar.stylecop.projectFilePath">
    <Value>$(MSBuildProjectFullPath)</Value>
  </SonarQubeSetting>
</ItemGroup>
```
prject 配置[参考](https://github.com/SonarSource/sonar-scanner-msbuild/blob/master/src/SonarScanner.MSBuild.Tasks/Targets/SonarQube.Integration.targets)

# Guia de Configuração do Servidor IIS
## Windows Server com IIS 10 - Aplicação WatchSR

Este guia é para administradores do Windows Server que precisam implantar e configurar a aplicação Vue.js WatchSR no IIS 10.

---

## Pré-requisitos

### Componentes Necessários
- Windows Server 2016 ou posterior
- IIS 10 (incluído com Windows Server 2016+)
- Módulo URL Rewrite para IIS 10
- FTP ou acesso a arquivo para fazer upload dos arquivos da aplicação

### Opcional mas Recomendado
- Certificado SSL (para HTTPS)
- Acesso administrativo ao IIS Manager

---

## Etapas de Instalação

### Etapa 1: Instalar Módulo URL Rewrite

O Módulo URL Rewrite é **necessário** para o roteamento de aplicação de página única (SPA) do Vue Router funcionar.

**Instalação:**

1. Baixe da Microsoft: [URL Rewrite para IIS](https://www.iis.net/downloads/microsoft/url-rewrite)
2. Execute o instalador
3. Siga o assistente de instalação
4. Reinicie o IIS após a instalação

**Verificar Instalação:**
1. Abra o IIS Manager
2. Clique no nome do servidor na árvore de visão
3. Procure por "URL Rewrite" na lista de recursos principais
4. Se presente, a instalação foi bem-sucedida ✅

---

### Etapa 2: Criar Estrutura de Pasta

Crie a pasta da aplicação no servidor. Você pode colocá-la em:
- `C:\inetpub\wwwroot\` (raiz padrão do IIS)
- Ou em qualquer outro local acessível ao IIS

Caminhos de exemplo:
- `C:\inetpub\wwwroot\watchsr\` - para implantação em subpasta
- `C:\inetpub\wwwroot\` - para implantação na raiz

Certifique-se de que o serviço IIS tenha permissões de leitura nesta pasta.

---

### Etapa 3: Fazer Upload de Arquivos da Aplicação

1. **Conecte-se ao seu servidor via FTP** usando seu cliente FTP
2. **Navegue até sua pasta de implantação** (ex: `www` ou similar)
3. **Envie todos os arquivos** de `C:\Ivan\Empresas\MEI\Site\_publish\`:
   - `index.html`
   - `web.config` (crítico para roteamento SPA)
   - pasta `assets/` (com todo conteúdo)
   - Qualquer outro arquivo de ativo

4. **Verifique o upload de arquivo:**
   - Certifique-se de que `web.config` está na raiz sua pasta de implantação
   - Certifique-se de que `index.html` está na mesma pasta
   - Certifique-se de que a pasta `assets/` está presente com todo conteúdo

---

### Etapa 4: Criar Site IIS

#### Usando IIS Manager (GUI)

1. Abra **IIS Manager**
2. No painel esquerdo, expanda o nome do seu servidor
3. Clique com botão direito em **Sites** → **Adicionar Site**
4. Preencha as seguintes informações:

   | Campo | Valor |
   |-------|-------|
   | Nome do site | `WatchSR` ou seu nome preferido |
   | Caminho físico | Caminho para sua pasta de implantação |
   | Tipo de vinculação | `http` ou `https` |
   | Endereço IP | Todos Não Atribuídos |
   | Porta | `80` (http) ou `443` (https) |
   | Nome do host | Seu nome de domínio (ou deixe em branco) |

5. Clique em **OK**

**Exemplo para implantação na raiz:**
- Nome do site: `WatchSR`
- Caminho físico: `C:\inetpub\wwwroot\`
- Vinculação: `http`, Porta `80`, Nome do host: `www.ibpsys.com.br`

6. Clique em **OK** para criar o site

---

### Etapa 5: Verificar Pool de Aplicação

1. No IIS Manager, expanda **Application Pools**
2. Encontre o pool de aplicação para seu site WatchSR
3. Clique com botão direito → **Configurações Básicas**
4. Certifique-se de que:
   - **Versão .NET CLR:** `Nenhum Código Gerenciado` (apenas arquivos estáticos)
   - **Modo de pipeline gerenciado:** `Integrado`

---

### Etapa 6: Verificar Regras de URL Rewrite

1. No IIS Manager, clique em seu site WatchSR
2. Clique duas vezes em **URL Rewrite**
3. Verifique se as regras estão em vigor:
   - Você deve ver a "Regra do Vue Router"
   - Se as regras não aparecerem, certifique-se de que `web.config` está na pasta correta

**Se as regras não aparecerem:**
- Verifique que `web.config` está na pasta raiz da aplicação
- Reinicie o IIS Manager ou reinicie o servidor
- Limpe o cache do IIS (se necessário)

---

### Etapa 7: Testar a Aplicação

1. Abra um navegador de internet
2. Navegue até a URL do seu site (ex: `http://www.ibpsys.com.br`)
3. Você deve ver a página inicial ✅
4. Clique em links de navegação - eles devem funcionar sem recarregamento de página
5. Teste a página de login e autenticação

---

## Detalhes de Configuração

### Arquivo web.config

O arquivo `web.config` incluído no pacote de implantação inclui:

✅ **Roteamento SPA do Vue Router** - Reescreve todas as solicitações que não são arquivo para `index.html`  
✅ **Compressão Gzip** - Comprime ativos para entrega mais rápida  
✅ **Mapeamento de Tipo MIME** - Tipos apropriados para formatos de arquivo modernos (.mjs, .woff2, etc.)  
✅ **Segurança** - Impede listagem de diretório  
✅ **Cache** - Define cache de 365 dias para ativos (com atualizações automáticas via hash)  
✅ **Suporte PHP** - Mantido da configuração do servidor original  

Esta configuração é **já otimizada** - você não deve precisar modificá-la.

---

## Resolução de Problemas

### Problema: Página mostra 404 ao atualizar ou navegar

**Causas:**
- `web.config` não está na pasta correta
- Módulo URL Rewrite não instalado
- IIS não está lendo o `web.config` corretamente

**Soluções:**
1. Verifique que o arquivo `web.config` existe na pasta raiz da aplicação
2. Verifique se o Módulo URL Rewrite está instalado (veja a Etapa 1)
3. Reinicie o IIS Manager: pressione F5 ou feche/abra novamente
4. Se necessário, reinicie o serviço IIS via Services.msc

### Problema: Não é possível acessar a aplicação

**Causas:**
- Site não criado corretamente no IIS
- Caminho físico incorreto
- Pool de Aplicação IIS não iniciado

**Soluções:**
1. Verifique se o site existe e está iniciado no IIS Manager
2. Verifique se o caminho físico aponta para a pasta correta
3. Verifique se o Pool de Aplicação está iniciado (clique com botão direito → Iniciar)
4. Verifique permissões de pasta - o serviço IIS precisa de acesso de leitura

### Problema: Arquivos retornam erros 404 (CSS/JS quebrado)

**Causas:**
- Pasta de ativos não foi enviada
- Tipos MIME não configurados
- Problemas de caminho de arquivo

**Soluções:**
1. Verifique se a pasta `assets/` existe e contém arquivos
2. Verifique a configuração de tipo MIME em `web.config`
3. Verifique se todos os arquivos foram enviados corretamente via FTP

### Problema: Imagens não sendo exibidas

**Causa:**
- Arquivos de imagem não foram enviados
- Permissões de arquivo

**Soluções:**
1. Verifique se os arquivos de imagem foram enviados para a pasta `assets/`
2. Verifique se os nomes de arquivo correspondem exatamente (sensível a maiúsculas/minúsculas em alguns sistemas)
3. Verifique se o IIS possui permissões de leitura em arquivos de imagem

### Problema: Chamadas de API retornando erros CORS

**Causas:**
- Problema na configuração do servidor de API (não relacionado a IIS)
- Ponto final da API não acessível a partir do servidor web

**Soluções:**
1. Verifique se a URL do ponto final da API é acessível a partir do servidor
2. Verifique a política CORS do servidor de API
3. Revise os logs da aplicação no navegador F12 (abas Network/Console)

### Problema: Página de ativação não funciona

**Causas:**
- Parâmetro `id` não fornecido na URL
- Ponto final da API não acessível

**Soluções:**
1. Verifique se a URL inclui o parâmetro `id` da consulta: `?id=SEU_ID`
2. Verifique o console do navegador (F12) para erros de API
3. Verifique se o ponto final da API é acessível e retorna resposta apropriada

---

## Otimização de Desempenho

### Cache de Ativos

O `web.config` está configurado para armazenar em cache os ativos por 365 dias. Isto significa:
- **Primeira visita:** Arquivos são baixados e armazenados
- **Visitas subsequentes:** Arquivos armazenados em cache são usados (muito rápido)
- **Após atualização:** Novos arquivos recebem novos nomes de hash, forçando o navegador a baixar a versão mais recente

Isto já está otimizado - nenhuma alteração necessária.

### Compressão GZIP

Ativos estáticos são automaticamente compactados. Isto:
- Reduz tamanhos de arquivo em 60-70%
- Acelera carregamento de página
- É transparente para o navegador (descompactado automaticamente)

---

## Considerações de Segurança

### HTTPS (Recomendado para Produção)

1. Obtenha um certificado SSL para seu domínio
2. No IIS Manager:
   - Clique com botão direito em seu site → **Editar Vinculações**
   - Clique em **Adicionar**
   - Selecione `https`, porta `443`, selecione seu certificado
3. Opcionalmente: Redirecione HTTP para HTTPS

### Navegação de Diretório

- **Desativada** por padrão em `web.config` ✅
- Os usuários não podem ver o conteúdo da pasta
- Apenas os arquivos acessíveis são servidos

### Comunicação de API

- As chamadas de API devem usar HTTPS em produção
- Atualize `src/service/api.js` para usar ponto final HTTPS se necessário

---

## Tarefas Comuns

### Reimplantando a Aplicação Atualizada

Quando você tiver uma nova compilação dos desenvolvedores:

1. Baixe os arquivos mais recentes dos desenvolvedores (da pasta `_publish/`)
2. Conecte-se ao servidor via FTP
3. Envie todos os arquivos, sobrescrevendo os existentes
4. No IIS Manager, clique em seu site e pressione **Reiniciar** (barra lateral direita)
5. Limpe seu cache do navegador (Ctrl+Shift+Delete) e atualize

### Verificando Arquivos de Log da Aplicação

Os logs do IIS normalmente estão em:
- `C:\inetpub\logs\LogFiles\W3SVC1\` (para seu site)

Os erros da aplicação também podem aparecer em:
- Visualizador de Eventos do Windows → Logs do Windows → Aplicação

### Gerenciando Pool de Aplicação

No IIS Manager:
- Clique com botão direito em Pool de Aplicação → **Iniciar/Parar/Reiniciar**
- Use isso para limpar memória ou recarregar configuração

---

## Notas Importantes

1. **Apenas Site Estático**
   - Esta aplicação é JavaScript/CSS/HTML puro
   - Nenhum ambiente de tempo de execução necessário
   - Recursos mínimos do servidor necessários

2. **Roteamento SPA do Vue Router**
   - Módulo URL Rewrite é **essencial**
   - `web.config` é **crítico** para roteamento
   - Sem isso, deep linking não funcionará

3. **Comunicação de API**
   - A aplicação chama API externa .NET
   - Certifique-se de que o servidor de API é acessível a partir do servidor web
   - Verifique firewalls de rede Se as chamadas de API falharem

4. **Navegador e Lado do Cliente**
   - Tokens de autenticação armazenados em localStorage do navegador
   - Logout limpa localStorage
   - Funciona em todos os navegadores modernos

---

## Recursos de Suporte

- [Documentação do IIS](https://docs.microsoft.com/pt-br/iis/)
- [Guia do Módulo URL Rewrite](https://docs.microsoft.com/pt-br/iis/extensions/url-rewrite-module/)
- [Documentação do Vue Router](https://router.vuejs.org/)
- [Hospedagem ASP.NET Core no IIS](https://docs.microsoft.com/pt-br/aspnet/core/host-and-deploy/iis/)

---

**Última Atualização:** 20 de março de 2026
**Aplicação:** Frontend Vue.js WatchSR
**Pasta de Implantação:** `C:\Ivan\Empresas\MEI\Site\_publish\`
2. Modify `src/service/api.js`
3. Rebuild and redeploy

**Option 2: Environment-based Configuration (Future Enhancement)**
Ask the developer to:
1. Implement `.env.production` support in Vite
2. Set API URL via environment variable

---

### SSL/HTTPS Configuration

For production deployment with HTTPS:

1. **Obtain SSL Certificate**
   - Self-signed: `New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My`
   - Commercial: Purchase from a trusted CA

2. **Import to IIS**
   - IIS Manager → Select server → Server Certificates
   - Click "Import" and select certificate file
   - Note the thumbprint

3. **Add HTTPS Binding**
   - In IIS Manager, select your WatchSR site
   - Right-click → Edit Bindings
   - Add binding: Type=HTTPS, Port=443, Certificate=Your Certificate

4. **Update Application Code**
   - Ensure API calls use HTTPS: `https://api.yourdomain.com`

---

## Maintenance

### Restarting the Application

**Via IIS Manager:**
1. Right-click the WatchSR site
2. Click "Restart"

**Via PowerShell:**
```powershell
# Restart application pool
Restart-WebAppPool -Name "WatchSR"

# Or restart entire IIS
iisreset
```

### Updating the Application

When a new version is deployed:

1. Stop the site: `Stop-IISSite -Name "WatchSR"`
2. Delete old files: `Remove-Item "C:\inetpub\wwwroot\watchsr\*" -Recurse -Force`
3. Extract new zip file to the folder
4. Start the site: `Start-IISSite -Name "WatchSR"`

---

## Troubleshooting

### Issue: 404 errors when refreshing pages

**Cause:** URL Rewrite module not working or not installed

**Solution:**
1. Verify URL Rewrite module is installed
2. Check that `web.config` exists in the application folder
3. Ensure URL Rewrite rules appear in IIS Manager
4. Restart IIS: `iisreset`

### Issue: Resources not loading (CSS, JS broken)

**Cause:** File permissions or path issues

**Solution:**
1. Verify all files were extracted from zip
2. Check file permissions: `icacls C:\inetpub\wwwroot\watchsr /grant "IIS AppPool\DefaultAppPool":F`
3. Check browser console (F12) for specific failed requests

### Issue: API calls getting 503 errors

**Cause:** API server is unreachable

**Solution:**
1. Verify .NET API is running on the configured server
2. Test connectivity: `Test-NetConnection -ComputerName "api-server" -Port 7132`
3. Check Windows Firewall rules
4. Verify API server is accessible from IIS server

### Issue: Slow page loads

**Cause:** Missing compression in web.config or large assets

**Solution:**
1. Verify compression is enabled in `web.config`
2. Restart IIS: `iisreset /restart`
3. Check network tab in browser (F12) for asset size

---

## Performance Optimization

### Enable Compression

Compression is already configured in `web.config`. If not working:

1. Verify Dynamic Compression is installed
2. Verify Static Compression is enabled
3. Restart IIS

### Configure Caching

Static assets (JS, CSS) are cached for 365 days by `web.config`. This is safe because filenames change on every build.

To adjust:
1. Edit `web.config`
2. Change `cacheControlMaxAge` value
3. Restart IIS

---

## Support & Escalation

If issues cannot be resolved:

1. **Check IIS Logs:** `C:\inetpub\logs\LogFiles\W3SVC1\`
2. **Check Application Event Log:** Event Viewer → Windows Logs → Application
3. **Enable Failed Request Tracing:** IIS Manager → Site → Failed Request Tracing Rules
4. **Contact the development team** with:
   - Server name and OS version
   - IIS version and installed modules
   - Error messages from logs
   - Browser console errors (F12)

---

**Last Updated:** March 2026
**Application:** WatchSR - Vue.js Frontend
**Server:** Windows Server with IIS 10

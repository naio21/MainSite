# Guia de Implantação da Aplicação Vue.js
## Windows Server + IIS 10

---

## Visão Geral

Este guia documenta o processo completo para construir e implantar esta aplicação Vue.js (com Vite) em um Windows Server executando IIS 10. A implantação é um **pacote de arquivo estático** sem dependências de tempo de execução necessárias no servidor.

---

## Pré-requisitos

### Máquina Local (Desenvolvimento)
- Node.js 16+ instalado
- npm instalado
- Git (opcional, para controle de versão)

### Servidor Remoto (Windows Server com IIS 10)
- IIS 10 instalado e em execução
- Módulo URL Rewrite instalado (necessário para roteamento SPA)
- Acesso administrativo básico ao IIS

---

## Etapa 1: Compilar a Aplicação Localmente

### 1.1 Preparar a compilação
Na sua máquina de desenvolvimento local:

```bash
# Navegue até o diretório do projeto
cd C:\Ivan\Empresas\MEI\Site\www

# Instalar dependências
npm install

# Execute o servidor de desenvolvimento para testar (opcional)
npm run dev

# Quando pronto para compilar, execute o comando de compilação
npm run build
```

### 1.2 Saída da compilação
Após executar `npm run build`, uma pasta `../_publish/` é criada (em `C:\Ivan\Empresas\MEI\Site\_publish\`) contendo:
- `index.html` - Ponto de entrada principal
- `assets/` - JavaScript agrupado, CSS e imagens
- `web.config` - Configuração de roteamento do IIS
- Todos os arquivos estáticos necessários para executar a aplicação

**Nenhum arquivo adicional é necessário!** Tudo é autossuficiente.

---

## Etapa 2: Preparar Arquivos para Implantação

Após a compilação, você tem todos os arquivos prontos em `C:\Ivan\Empresas\MEI\Site\_publish\`:

### 2.1 Arquivos para enviar
```
_publish/
├── index.html           ← Ponto de entrada principal
├── web.config           ← Configuração do IIS (certifique-se de que está incluído)
└── assets/
    ├── index-*.js       ← JavaScript agrupado
    ├── index-*.css      ← CSS agrupado
    └── logo-*.png       ← Imagens
```

---

## Etapa 3: Implantar no Windows Server

### 3.1 Transferir arquivos para o servidor (FTP)

1. Conecte-se ao seu servidor web via cliente FTP
2. Navegue até a pasta raiz da web (tipicamente `www` ou similar)
3. Envie todos os arquivos de `C:\Ivan\Empresas\MEI\Site\_publish\` para o servidor
4. Certifique-se de que `web.config` é enviado para a mesma pasta que `index.html`

### 3.2 Estrutura de pasta no servidor
Após o upload, sua pasta web deve ter este aspecto:
```
/www/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── logo-*.png
├── web.config  ← Crítico para roteamento SPA
└── [outros arquivos se houver]
```

---

## Etapa 4: Configurar IIS 10

### 4.1 Verificar pré-requisitos

**Módulo URL Rewrite** é necessário para roteamento SPA do Vue Router.

Para verificar se está instalado:
1. Abra o IIS Manager
2. Procure por **URL Rewrite** na lista de recursos principais
3. Se não estiver presente:
   - Baixe: [Módulo IIS URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
   - Instale no servidor
   - Reinicie o IIS

### 4.2 Configuração da Aplicação

O arquivo `web.config` inclui:
- **URL Rewrite** (Roteamento SPA do Vue Router)
- **Compressão Gzip** para ativos
- **Tipos MIME apropriados** para JavaScript e CSS modernos
- **Configurações de segurança** (navegação de diretório desabilitada)

Se o site estiver hospedado em uma subpasta, isso é tratado automaticamente pela configuração de compilação.

---

## Etapa 5: Testar a Implantação

1. Abra seu navegador e navegue até seu site
2. A página inicial deve carregar ✅
3. Clique em links - Vue Router deve lidar com a navegação sem recarga de página
4. Teste o link de ativação (se tiver um):
   - Navegue até `https://seudominio.com/activate?id=SEU_ID_ATIVACAO`
   - Deve invocar a API e mostrar mensagem de sucesso/erro

**Testar autenticação:**
1. Vá para página de login
2. Faça login com credenciais válidas
3. Após login, você deve acessar páginas protegidas

---

## Etapa 6: Verificar Configuração de API

O ponto final da API é configurado em `src/service/api.js` e está definido como **URL de produção por padrão**:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.ibpsys.com.br/watchsr';
```

**Se você precisar alter isso:**

1. Edite `src/service/api.js` na sua máquina local
2. Atualize a URL padrão
3. Recompile: `npm run build`
4. Envie os novos arquivos de `C:\Ivan\Empresas\MEI\Site\_publish\`

---

## Lista de Verificação Completa de Implantação

- [ ] Execute `npm install` na máquina local
- [ ] Execute `npm run build` para criar a pasta `_publish/`
- [ ] Transfira todos os arquivos de `C:\Ivan\Empresas\MEI\Site\_publish\` para o servidor via FTP
- [ ] Certifique-se de que `web.config` foi enviado para a pasta raiz
- [ ] Instale o Módulo URL Rewrite no servidor (se necessário)
- [ ] Verifique se o site IIS aponta para a pasta correta
- [ ] Teste a aplicação no navegador
- [ ] Teste o link de ativação (com ID de ativação)
- [ ] Teste o fluxo de autenticação

---

## Implantações Futuras

Para implantações subsequentes:

1. **Máquina local:**
   ```bash
   npm install
   npm run build
   ```

2. **Enviar via FTP:**
   - Envie todos os arquivos de `C:\Ivan\Empresas\MEI\Site\_publish\` para seu servidor web
   - Sobrescreva os arquivos existentes

3. **Atualizar Cache do IIS (se necessário):**
   - No IIS Manager, clique em seu site
   - Clique em **Reiniciar** (no painel de Ações à direita)

---

## Resolução de Problemas

### Problema: Página mostra 404 ao atualizar
**Solução:** Certifique-se de que `web.config` está na pasta raiz e que o Módulo URL Rewrite está instalado no servidor.

### Problema: Não é possível acessar a API do site implantado
**Solução:** Verifique a URL da API no console do navegador (F12). Verifique se o servidor de API é acessível a partir do seu servidor web.

### Problema: Token de autenticação não persiste
**Solução:** Verifique o console do navegador (F12) para erros. Certifique-se de que localStorage está ativado e não bloqueado por políticas.

### Problema: Ativos não carregam (CSS/JS está quebrado)
**Solução:** Verifique se todos os arquivos da pasta `assets/` foram enviados. Verifique os logs do IIS se houver erros 404.

### Problema: Página de ativação mostra erro
**Solução:** Verifique se o parâmetro `id` está sendo passado corretamente na URL. Verifique se o ponto final da API é acessível.

---

## Notas Importantes

1. **Apenas Site Estático:** Esta aplicação não requer nenhum ambiente de tempo de execução no servidor. É puramente HTML/CSS/JS.

2. **Dependência de API:** A aplicação se comunica com sua API .NET no ponto final configurado - certifique-se de que é acessível a partir do seu servidor.

3. **HTTPS (Recomendado para Produção):**
   - Solicite um certificado SSL para seu domínio
   - Vincule HTTPS no IIS
   - Atualize a configuração da API se necessário

4. **Cache do Navegador:** O `web.config` define cache de 365 dias para ativos. O Vite gera automaticamente novos nomes de hash para arquivos em cada compilação, portanto os navegadores sempre buscarão a versão mais recente.

5. **Links de Ativação:** Os usuários devem receber emails de ativação com links como:
   ```
   https://seudominio.com/activate?id=SEU_ID_CRIPTOGRAFIA
   ```
   A página de ativação invocará automaticamente a API e mostrará o resultado.

---

## Recursos de Suporte

- [Documentação do IIS](https://docs.microsoft.com/pt-br/iis/)
- [Módulo URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
- [Configuração do Vue Router](https://router.vuejs.org/)
- [Guia de Implantação do Vite](https://vitejs.dev/guide/static-deploy.html)

---

**Última Atualização:** 20 de março de 2026
**Aplicação:** Frontend Vue.js WatchSR
**Servidor:** Windows Server com IIS 10

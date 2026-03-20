# Aplicação WatchSR - Documentação de Implantação

📦 **Aplicação web estática e autossuficiente** - Sem dependências de tempo de execução necessárias no servidor de produção.

## Início Rápido

### Para Desenvolvedores (Compilação)

```bash
# 1. Instalar dependências
npm install

# 2. Compilar para produção
npm run build
```

**Saída:** Todos os arquivos são criados em `C:\Ivan\Empresas\MEI\Site\_publish\`

### Para Administradores IIS (Implantação no Servidor)

1. **Pré-requisitos:**
   - Windows Server com IIS 10
   - Módulo URL Rewrite para IIS (necessário)

2. **Implantar:**
   - Envie todos os arquivos de `C:\Ivan\Empresas\MEI\Site\_publish\` para seu servidor web via FTP
   - Certifique-se de que `web.config` está na pasta raiz
   - Verifique se o site IIS aponta para a pasta correta

3. **Testar:** Navegue até a URL do seu servidor no navegador

---

## Arquivos de Documentação

| Arquivo | Propósito | Para |
|---------|-----------|------|
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Processo de implantação completo passo a passo | Desenvolvedores & DevOps |
| [IIS_SETUP_GUIDE.md](IIS_SETUP_GUIDE.md) | Configuração e resolução de problemas do servidor IIS | Administradores de Sistema |
| [web.config](web.config) | Configuração do IIS para Vue Router SPA | Implantado automaticamente |

---

## O que está Incluído

### Arquivos Locais (Máquina de Desenvolvimento)
- `web.config` - Configuração do IIS para roteamento SPA
- `DEPLOYMENT_GUIDE.md` - Documentação completa de implantação
- `IIS_SETUP_GUIDE.md` - Guia do administrador do servidor
- `src/` - Código-fonte Vue.js
- `vite.config.js` - Configuração de compilação Vite

### Saída de Compilação (Na pasta _publish/)
- `index.html` - Ponto de entrada principal da aplicação
- `assets/` - JavaScript, CSS e imagens agrupados
- `web.config` - Configuração de roteamento do IIS

---

## Pilha de Tecnologia

- **Frontend:** Vue.js 3.5
- **Ferramenta de Compilação:** Vite 7.3
- **Roteamento:** Vue Router 4.3 com página de ativação
- **Cliente HTTP:** Axios 1.13
- **Servidor:** IIS 10 (Windows Server)
- **Hospedagem:** Arquivos estáticos (sem tempo de execução necessário)

---

## Configuração de API

A aplicação se comunica com uma API da Web .NET em:
```
https://www.ibpsys.com.br/watchsr
```

Isso é configurado automaticamente. Para alterá-lo:
1. Edite `src/service/api.js`
2. Altere a constante `API_BASE_URL`
3. Recompile: `npm run build`
4. Reimplante arquivos da pasta `_publish/`

---

## Recurso-chave

✅ **Autenticação** - Login com email e senha  
✅ **Registro de Usuário** - Inscrição com detalhes da empresa  
✅ **Ativação de Conta** - Página de ativação via link de email  
✅ **Proteção de Rotas** - Redirecionamento automático para a página de login  
✅ **Gerenciamento de Token** - Expiração de token de 14 dias com avisos  
✅ **Logout** - Limpar token e redirecionar para a página inicial  
✅ **Aviso de Expiração de Token** - Banner aparece 24 horas antes da expiração  
✅ **Roteamento SPA** - Vue Router com tratamento adequado de 404  
✅ **Design Responsivo** - Funciona em todos os dispositivos  

---

## Novos Recursos

### Página de Ativação de Conta
Os usuários agora podem concluir a ativação da conta através do link de email:
- Página de destino em `/activate`
- Extrai automaticamente o ID de ativação da URL
- Chama a API para ativar a conta
- Mostra mensagem de sucesso ou erro

Exemplo de link de ativação:
```
https://www.ibpsys.com.br/activate?id=hpX7WelBDCsMF/wQyHwpIw==
```

---

## Processo de Implantação

```
Desenvolvimento Local
    ↓
npm install
    ↓
npm run build (cria pasta _publish/)
    ↓
Enviar arquivos via FTP para servidor web
    ↓
Verificar se web.config está no lugar
    ↓
Acessar via navegador
    ↓
✅ Pronto para usar!
```

---

## Estrutura de Arquivos

```
c:\Ivan\Empresas\MEI\Site\www\
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── style.css
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── pages/
│   │   ├── Auth.vue         (Login/Signup)
│   │   ├── Activate.vue     (Página de ativação)
│   │   ├── Home.vue         (Página inicial)
│   │   └── WatchSR.vue      (Página protegida)
│   └── service/
│       ├── api.js           (Configuração Axios)
│       └── authService.js   (Lógica de autenticação)
├── public/
├── node_modules/
├── vite.config.js
├── web.config               (Configuração do IIS)
├── DEPLOYMENT_GUIDE.md
├── DEPLOYMENT_README.md     (este arquivo)
├── IIS_SETUP_GUIDE.md
└── [outros arquivos do projeto]
```

---

## Estrutura de Saída de Compilação

Após `npm run build`, a pasta `_publish/` contém:

```
_publish/
├── index.html               (Ponto de entrada principal)
├── web.config               (Regras de roteamento do IIS)
├── favicon.svg
├── vite.svg
└── assets/
    ├── index-*.js           (Bundle do aplicativo principal)
    ├── index-*.css          (Bundle de estilos)
    └── logo-*.png           (Ativos de imagem)
```

O `*` nos nomes de arquivo representa o hash do Vite para cache-busting.

---

## Lista de Verificação de Implantação

- [ ] Executar `npm install` 
- [ ] Executar `npm run build`
- [ ] Verificar conteúdo da pasta `_publish/`
- [ ] Enviar todos os arquivos de `_publish/` para servidor web via FTP
- [ ] Garantir que `web.config` está na pasta raiz
- [ ] Verificar se o servidor web tem o Módulo URL Rewrite instalado
- [ ] Testar aplicação no navegador
- [ ] Testar fluxo de autenticação
- [ ] Testar link de ativação

---

## Suporte

Para instruções detalhadas de implantação, consulte [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

Para configuração do servidor IIS, consulte [IIS_SETUP_GUIDE.md](IIS_SETUP_GUIDE.md)

---

**Última Atualização:** 20 de março de 2026
**Aplicação:** Frontend Vue.js WatchSR
**Saída de Compilação:** `C:\Ivan\Empresas\MEI\Site\_publish\`
├── dist/                    (Generated by build - don't commit)
├── public/
├── package.json
├── vite.config.js
├── web.config              ⭐ For IIS
├── deploy.ps1              ⭐ Deployment script
├── DEPLOYMENT_GUIDE.md     ⭐ Main documentation
├── IIS_SETUP_GUIDE.md      ⭐ Admin guide
└── README.md               (This file)
```

---

## Common Tasks

### Deploy a New Version

```bash
# Local machine
npm run build
.\deploy.ps1

# On server
# 1. Stop IIS site
# 2. Replace files with new version
# 3. Start IIS site
# 4. Test in browser
```

### Change API Endpoint

```bash
# Edit src/service/api.js
# Change API_BASE_URL: 'https://your-api-server:port'
npm run build
.\deploy.ps1
# Redeploy zip file
```

### Add New Protected Route

```javascript
// In src/main.js
{
  path: '/new-route',
  name: 'NewRoute',
  component: NewRoute,
  meta: { requiresAuth: true }  // This makes it protected
}
```

---

## Troubleshooting

### Application doesn't load
- Check browser console (F12)
- Verify all files were extracted from zip
- Check IIS website binding

### Login doesn't work
- Check API is accessible from server
- Verify API URL in `api.js`
- Check network tab in F12 developer tools

### Pages show 404 when refreshed
- Verify URL Rewrite module is installed
- Check `web.config` is in application folder
- Restart IIS

For more details, see [IIS_SETUP_GUIDE.md](IIS_SETUP_GUIDE.md)

---

## Support Resources

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Detailed deployment process
- [IIS Setup Guide](IIS_SETUP_GUIDE.md) - Server configuration
- [Vue Router Docs](https://router.vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [IIS Documentation](https://docs.microsoft.com/iis/)

---

## Next Steps

1. **Prepare for deployment:**
   ```bash
   npm run build
   .\deploy.ps1
   ```

2. **For IIS Admin:**
   - Follow [IIS_SETUP_GUIDE.md](IIS_SETUP_GUIDE.md)
   - Install URL Rewrite Module
   - Create IIS website
   - Test in browser

3. **For ongoing maintenance:**
   - Follow deployment checklist in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - Use `deploy.ps1` for automated builds

---

**Application:** WatchSR Vue.js Frontend  
**Server:** Windows Server with IIS 10  
**Last Updated:** March 2026  
**Status:** ✅ Ready for Production

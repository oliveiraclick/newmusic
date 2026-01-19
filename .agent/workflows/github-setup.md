---
description: Como subir o projeto para o GitHub e continuar em outra máquina
---

Para continuar seu projeto de qualquer lugar, siga estes passos:

### 1. No GitHub
Crie um novo repositório vazio no [github.com/new](https://github.com/new). **Não** adicione README ou licença agora.

### 2. No seu Terminal (esta máquina)
Abra o terminal no VS Code e execute estes comandos:

// turbo
```powershell
# Inicializar o git
git init

# Adicionar todos os arquivos (exceto node_modules que o .gitignore já cuida)
git add .

# Fazer o primeiro commit
git commit -m "feat: setup premium logic and segmented landing pages"

# Conectar ao seu GitHub (SUBSTITUA pela URL do seu repositório novo)
# git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Subir os arquivos
# git branch -M main
# git push -u origin main
```

### 3. Na outra máquina
Basta ter o Git e Node.js instalados e rodar:

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd seu-repositorio
npm install
npm run dev
```

> [!IMPORTANT]
> Lembre-se de configurar o arquivo `.env` com suas chaves do Supabase na nova máquina!

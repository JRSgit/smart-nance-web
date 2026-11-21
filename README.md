# 🏛️ Smart-Nance Web — Sabedoria da Babilônia para suas Finanças

![Next.js](https://shields.io)
![TypeScript](https://shields.io)
![Tailwind CSS](https://shields.io)
![Supabase](https://shields.io)
![Licença](https://shields.io)

> *"Uma parte de tudo o que você ganha pertence a você."* — **Arkad, O Homem Mais Rico da Babilônia**

O **Smart-Nance Web** é uma aplicação completa e responsiva de gestão financeira pessoal desenvolvida em **Next.js** e **Supabase**. Projetada para funcionar tanto em computadores quanto em dispositivos móveis, a plataforma ajuda os usuários a organizar suas finanças, quitar dívidas e construir patrimônio aplicando os princípios atemporais do livro **"O Homem Mais Rico da Babilônia"**, de George S. Clason.

---

## ✨ Funcionalidades Principais

* **🔐 Autenticação Segura & Google OAuth:** Login e cadastro via e-mail/senha ou com um clique usando a conta Google, com isolamento total de dados por usuário (*Row Level Security*).
* **⚖️ Motor de Projeção de Arkad (Regra 10% / 20% / 70%):** Cálculo automático e em tempo real a partir das receitas cadastradas:
  * **10% Pague-se primeiro:** Reserva obrigatória destinada ao próprio patrimônio antes de qualquer gasto.
  * **20% Quitação de Dívidas:** Orçamento dedicado para honrar compromissos e eliminar tabuletas de dívidas.
  * **70% Custo de Vida:** Teto máximo para despesas mensais com barra de progresso inteligente.
* **📊 Gestão de Receitas e Despesas:** Registro detalhado de entradas e saídas, separando gastos entre **Necessidades** e **Desejos Supérfluos** (2ª Cura de Arkad).
* **💰 Tesouro & Simulador de Rendimentos:** Acompanhamento da poupança acumulada e calculadora de juros compostos para simular a multiplicação do ouro ao longo dos meses (3ª Cura de Arkad).
* **📜 Tabuletas de Dívidas & Amortização:** Cadastro de dívidas com cálculo automático do valor das parcelas e sistema de amortização mensal até a quitação total, alertando caso as parcelas ultrapassem o limite de 20% da renda.
* **🎓 Academia da Riqueza (Mini Curso de Arkad):** Trilha de aprendizado interativa com lições práticas e quiz de fixação. Usuários que atingem **80% ou mais de aproveitamento** conquistam o **Pin de Ouro da Babilônia**.
* **📱 Design Responsivo (Desktop & Mobile):** Navegação adaptativa com menu lateral fixo em telas grandes e barra de navegação inferior (*Bottom Tab Bar*) em smartphones.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org) (App Router & Server/Client Components)
* **Linguagem:** [TypeScript](https://typescriptlang.org)
* **Estilização & Tipografia:** [Tailwind CSS](https://tailwindcss.com) com fontes Google (`Cinzel` e `Plus Jakarta Sans`)
* **Ícones:** [Lucide React](https://lucide.dev)
* **Back-end & Banco de Dados:** [Supabase](https://supabase.com) (PostgreSQL, Auth & Row Level Security)
* **Gerenciamento de Estado:** React Context API (`FinanceContext`)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org) (versão 18 ou superior)
* Uma conta gratuita no [Supabase](https://supabase.com)

### Passo a passo

```bash
# 1. Clone este repositório
git clone https://github.com

# 2. Acesse a pasta do projeto
cd smart-nance-web

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env.local na raiz do projeto e adicione:
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador para visualizar a aplicação.

---

## 🗄️ Estrutura do Banco de Dados (Supabase)

O projeto utiliza quatro tabelas principais protegidas por políticas de **RLS (`auth.uid() = user_id`)**:
* `transacoes`: Armazena receitas e despesas vinculadas ao usuário.
* `depositos_poupanca`: Registra os aportes realizados no tesouro pessoal.
* `dividas`: Controla o valor total, quantidade de parcelas, valor da parcela e progresso de amortização.
* `progresso_curso`: Salva o melhor aproveitamento no quiz e o status de conquista do **Pin de Ouro**.

---

## 📱 Ecossistema Smart-Nance

Este repositório corresponde à versão **Web** da plataforma, compartilhando a mesma identidade visual (Dark Mode com acentos em Ouro `#E5B83B` e Coral `#E06C65`) e estrutura de dados do aplicativo móvel desenvolvido em **Expo / React Native**.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por **[JRSgit](https://github.com)** 🚀

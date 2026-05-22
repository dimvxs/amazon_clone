# ORBIS

ORBIS — это командный дипломный проект, представляющий собой онлайн-маркетплейс, вдохновлённый функциональностью платформы Amazon

Проект реализует основные сценарии интернет-магазина: просмотр товаров, корзина, оформление заказов и администрирование платформы.

---

## Основные возможности

- Регистрация и авторизация пользователей
- Каталог товаров
- Поиск и фильтрация
- Корзина покупок
- Оформление заказов
- Личный кабинет пользователя
- Админ-панель
- Управление товарами и заказами

---

## Технологии

### Frontend
- React
- TypeScript
- HTML5
- CSS3

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core

### Database
- SQLite

### Cloud / DevOps
- Cloud hosting backend, storage, deployment.
- S3, EC2.

---

## Архитектура проекта

- Client (React + TypeScript)
- Server (ASP.NET Core Web API)
- Database (SQLite)
- Cloud infrastructure (AWS)

---

## Установка проекта

### Клонирование репозитория

```bash
git clone https://github.com/dimvxs/amazon_clone
cd backend/frontend
```

--- 


## Запуск Frontend

```bash
cd client
npm install
npm run dev
```

---

## Запуск Backend

```bash
cd server
dotnet restore
dotnet run
```
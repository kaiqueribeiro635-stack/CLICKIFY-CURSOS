# Pixels de conversão (Adapter + Factory/Strategy)

## Objetivo

Centralizar o disparo de eventos de conversão por produto e permitir plugar novas plataformas sem alterar o núcleo do sistema.

## Estrutura

- `adapters/*`: um adapter por plataforma, cada um traduzindo o evento interno para o payload do provedor
- `pixel-adapter.factory.ts`: fábrica que resolve a Strategy (adapter) por `platform`
- `pixel-integration.service.ts`: serviço central que busca pixels ativos do produto, dispara evento e registra logs
- `entities/product-pixel.entity.ts`: configurações por produto (plataforma + config)
- `entities/pixel-event-log.entity.ts`: auditoria de envios
- `database/migrations/002_pixels.sql`: tabelas `product_pixels` e `pixel_event_logs`

## Como disparar eventos

O backend deve chamar:

- `PixelIntegrationService.triggerPurchase(productId, transactionData)`
- `PixelIntegrationService.triggerLead(productId, userData)`

O serviço:

1. Consulta `product_pixels` por `productId` e `active=true`
2. Cria o adapter via `PixelAdapterFactory`
3. Inicializa com `config` e valida
4. Dispara o evento (com retry e timeout)
5. Insere o log em `pixel_event_logs`

## Retry e timeout

Configuração por env:

- `PIXEL_RETRY_MAX` (default 3)
- `PIXEL_TIMEOUT_MS` (default 2500)

Também pode ser ajustado por chamada via `TriggerOptions`.

## Como adicionar uma nova plataforma

1. Criar um novo adapter em `adapters/` estendendo `BasePixelAdapter`
2. Implementar `validatePixel`, `sendPurchaseEvent`, `sendLeadEvent`, `formatPayload`
3. Registrar na `PixelAdapterFactory.createAdapter(platform)`
4. Atualizar o tipo `PixelPlatform` em `types.ts`


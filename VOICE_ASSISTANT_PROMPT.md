# Voice Assistant — Prompt Notes

KisanMandi AI's voice UX is intended to help farmers access market-price and selling information in a familiar language.

## Interaction goals
- Ask for crop and location when needed.
- Use simple, concise language and confirm key details before presenting a recommendation.
- Explain whether figures are observed prices, user input, or estimates/forecasts.
- Present market options in terms of expected net realization where relevant, including transportation and handling costs only when data is available.
- Support multilingual interactions, including Hindi and Marathi as described in the SIH idea presentation. Other languages should be enabled only after testing.
- Provide a text alternative and handle microphone permission or speech-recognition failures gracefully.

## Safety and accuracy
- Never invent live mandi prices, buyer credentials, forecasts, or transport costs.
- Clearly communicate when market data is stale, missing, or unavailable.
- Describe predictions as estimates, not guaranteed prices. Encourage users to verify market conditions before selling.
- Do not claim a transaction, alert, or buyer connection succeeded until the system confirms it.

declare module '@grammarly/sdk' {
  export interface GrammarlyEditorPluginOptions {
    clientId: string;
    documentDialect?: 'american' | 'british' | 'canadian' | 'australian';
    documentDomain?: string;
    activation?: boolean | 'manual' | 'immediate' | 'focus';
    oauthRedirectUri?: string;
    mode?: string;
  }

  export class GrammarlyEditorPlugin {
    constructor(options: GrammarlyEditorPluginOptions);
    addTo(element: HTMLElement): () => void;
    removeFrom(element: HTMLElement): void;
    dispose(): void;
  }
}

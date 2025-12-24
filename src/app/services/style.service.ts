import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StyleService {

    private stylesByPage: Record<string, string[]> = {
        women: [],
        men: [],
        kids: [],
        shoes: [],
        accessories: []
    };

    getStyles(page: string): string[] {
        return this.stylesByPage[page] || [];
    }

    addStyle(page: string, styleName: string) {
        if (!styleName.trim()) return;

        if (!this.stylesByPage[page].includes(styleName)) {
            this.stylesByPage[page].push(styleName);
        }
    }
}

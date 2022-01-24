import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchResult, Word } from '@what-did-you-say/words';

@Component({
    selector: 'wdys-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
    @Input() searchResults: SearchResult[];
    @Output() wordSelected = new EventEmitter<Word>();

    /**
     * Emits to parent a Word that was clicked
     * @param word Word that was clicked
     */
    select(word: Word) {
        this.wordSelected.emit(word);
    }
}

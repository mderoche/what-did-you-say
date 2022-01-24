import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'wdys-tone-ranking-bar',
    templateUrl: './tone-ranking-bar.component.html'
})
export class ToneRankingBarComponent implements OnChanges {
    @Input() rank: number;
    color: string;

    ngOnChanges() {
        this.color = {
            0: 'secondary',
            1: 'info',
            2: 'primary',
            3: 'success',
            4: 'warning',
            5: 'danger'
        }[this.rank];
    }
}

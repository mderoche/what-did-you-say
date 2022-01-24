import { Component, Input } from '@angular/core';
import { ToneRanking } from '@what-did-you-say/words';

@Component({
    selector: 'wdys-tone-ranking',
    templateUrl: './tone-ranking.component.html',
    styleUrls: ['./tone-ranking.component.scss']
})
export class ToneRankingComponent {
    @Input() toneRanking: ToneRanking;
}

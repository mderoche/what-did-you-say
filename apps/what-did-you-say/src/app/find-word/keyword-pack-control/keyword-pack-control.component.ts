import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeywordPack } from '@what-did-you-say/words';

@Component({
    selector: 'wdys-keyword-pack-control',
    templateUrl: './keyword-pack-control.component.html',
    styleUrls: ['./keyword-pack-control.component.scss']
})
export class KeywordPackControlComponent {
    @Input() keywordPack: KeywordPack;
    @Input() control: FormControl;
}

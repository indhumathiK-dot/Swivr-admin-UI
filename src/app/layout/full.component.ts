import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

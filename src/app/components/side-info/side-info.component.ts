import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioSummary } from '../../models';

@Component({
  selector: 'side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit {

  @Input() summary: PortfolioSummary = null;
  constructor(private portfolioService: PortfolioService) { }

  imageSrc(filename: string) {
    return this.portfolioService.getImageUrl(filename);
  }

  ngOnInit() {
  }
}

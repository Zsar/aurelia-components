import {bindable} from "aurelia-templating";
import {bindingMode} from "aurelia-binding";
import ApexCharts, {ApexOptions} from 'apexcharts';

export interface ISelection {
    series?:number;
    dataPointIndex?:number;
}

export type ApexSeries = ApexAxisChartSeries | ApexNonAxisChartSeries

export class ApexChart {
    private _apex: HTMLDivElement;
    private _myApexChart: ApexCharts|null;

    @bindable({ defaultBindingMode: bindingMode.toView })
    options: ApexOptions;

    @bindable({ defaultBindingMode: bindingMode.toView })
    series: ApexSeries;

    @bindable({ defaultBindingMode: bindingMode.toView })
    selection: ISelection;

    @bindable({ defaultBindingMode: bindingMode.toView })
    class:string;

    attached() {
        if (this.options) {
            this._createChart();
        }

    }

    detached() {
        if (this._myApexChart) {
            this._myApexChart.destroy();
            this._myApexChart = null;
        }
    }

    optionsChanged(newOptions:ApexOptions) {
        if (this._myApexChart) {
            this._myApexChart.updateOptions(newOptions);
        } else {
            this._createChart();
        }
    }

    seriesChanged(newSeries:ApexSeries) {
        if (this._myApexChart) {
            this._myApexChart.updateSeries(newSeries);
        } else {
            this._createChart();
        }
    }

    selectionChanged(newValue:ISelection, oldValue:ISelection) {
        if (this._myApexChart) {
            if (newValue) {
                this._myApexChart.toggleDataPointSelection(newValue.series, newValue.dataPointIndex);
            }
            else if (oldValue) {
                this._myApexChart.toggleDataPointSelection(oldValue.series, oldValue.dataPointIndex);
            }
        }
    }

    private _createChart() {
        if (!this._apex) {
            return;
        }

        if (!this.options.series) {
            if (this.series) {
                this.options.series = this.series;
            } else {
                this.options.series = [];
            }
        }

        this._myApexChart = new ApexCharts(this._apex, this.options);
        this._myApexChart.render();
    }
}

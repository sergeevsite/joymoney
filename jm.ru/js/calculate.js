'use strict';

window.addEventListener('DOMContentLoaded', () => {

  class Calculate {
    constructor(data) {
      this.data = data;
      this.total = document.querySelector('.js-calc__total');
      this.globalData = {
        percentSale: 0,
        percent: 1,
        termWeek: 10
      };
    }

    valuesCustom(range, values) {
      if(range.valuesCustom) {
        let valuesArr = [];
        values.forEach((item, i) => {
          if(range.valuesOptions) {
            if(i === range.valuesOptions.part) {
              if(i === 0) {
                for(let n = range.min; n < item + range.step; n += range.valuesOptions.step) {
                  valuesArr.push(n);
                }
              }
              if(i === 1) {
                for(let n = item; n < range.max + range.step; n += range.valuesOptions.step) {
                  valuesArr.push(n);
                }
              }
            } else {
              if(i === 0) {
                for(let n = range.min; n < item + range.step; n += range.step) {
                  valuesArr.push(n);
                }
              }
              if(i === 1) {
                for(let n = item; n < range.max + range.step; n += range.step) {
                  valuesArr.push(n);
                }
              }
            }
          } else {
            if(i === 0) {
              for(let n = range.min; n < item + range.step; n += range.step) {
                valuesArr.push(n);
              }
            }
            if(i === 1) {
              for(let n = item; n < range.max + range.step; n += range.step) {
                valuesArr.push(n);
              }
            }
          }
        });
        return valuesArr;
      } else {
        return values;
      }
    }

    convertFrom(range, rangeInit) {
      let index;
      rangeInit.options.values.forEach((item, i) => {
        if(range.from === item) {
          index = i;
        }
      })
      return index;
    }

    syncValue(range, data, rangeInit) {
      const values = document.querySelector(range.fieldValue);
      values.textContent = data.from_value;
    }

    getData(range, data, id) {
      if(id === 1) {
        this.globalData.amount = data.from_value
      }
      if(id === 2) {
        if(data.from >= 21) {
          this.globalData.termWeek = data.from_value
        } else {
          this.globalData.term = data.from_value
        }
      }
      this.calculatingResult(range, data, id);
    }

    calculatingResult(range, data, id) {
      if(this.globalData.amount > 6000) {
        this.total.textContent = this.globalData.amount + (this.globalData.amount * this.globalData.percent / 100 * this.globalData.term);
      } else {
        this.total.textContent = this.globalData.amount + (this.globalData.amount * this.globalData.percentSale * this.globalData.term);
      }

      if(id === 1) {

      }

      if(id === 2) {
        if(data.from >= 21) {
          console.log(data);
        }

      }

    }

    init() {
      for(let i = 1; i < Object.keys(this.data).length + 1; i++) {
        let range = this.data[`range_${i}`];
        let rangeInit = $(range.selector).ionRangeSlider({
          skin: range.skin,
          type: range.type,
          min: range.min,
          max: range.max,
          to: range.to,
          step: range.step,
          values: this.valuesCustom(range, range.values),
          hide_from_to: range.hide_from_to,
          hide_min_max: range.hide_min_max,
          onStart: data => {
            this.syncValue(range, data);
          },
          onChange: data => {
            this.syncValue(range, data);
            this.getData(range, data, i);
          },
          onUpdate: data => {
            this.syncValue(range, data);
            this.getData(range, data, i);
          }
        }).data("ionRangeSlider");
        
        // start values
        rangeInit.update({
          from: this.convertFrom(range, rangeInit),
        });
      }
    }
  };

  const calc = new Calculate({
    range_1: {
      selector: '.calc__range--sum',
      fieldValue: '.calc__value--sum',
      skin: "round",
      min: 3000,
      max: 60000,
      from: 6000,
      step: 500,
      valuesCustom: true,
      values: [20000, 30000],
      // hide_from_to: true,
      hide_min_max: true,
    },
    range_2: {
      selector: '.calc__range--date',
      fieldValue: '.calc__value--date',
      skin: "round",
      min: 10,
      max: 18,
      from: 15,
      step: 1,
      valuesCustom: true,
      values: [30, 10],
      valuesOptions: {
        part: 1,
        step: 2
      },
      // hide_from_to: true,
      hide_min_max: true
    }
  });
  calc.init();

});

/* DOCS class Calculate
  
  HTML
  <input type="text" class="class">

  example
  range_(number): {
    // ionRangeSlider * 
      skin: "round",
      min: 0,
      max: 60000,
      step: 500
      ...
    // custumSettings
    selector: * 
      class range ('.class')
    fieldValue: *
      class value ('.class')
    valuesCustom: true || false 
      [Ступенька значений]
    values: 
      Если valuesCustom: true принимает 2 значения в массиве [20000, 30000].
      Например: Будет перескок с 20000 на 30000 игнорируя числа от 20000 до 30000.
      Если valuesCustom: false работает настройка из ionRangeSlider
    valuesOptions: (работает только при ValuesCustom: true)
      Принимает объект с параметрами part и step.
      Это для изменения шага перед ступенькой и после (задаваемая в values).
      Например: 
      valuesOptions: {
        part: 1,
        step: 20
      }
      такие настройки будут применены ко второй половине после ступеньки и шаг измениться на 20.
  } 
*/
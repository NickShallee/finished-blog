export class DateFormatValueConverter {
  toView(value) {
  	if (value instanceof Date) {
	  	return value.toLocaleDateString('en-US');
  	}
  }

  fromView(value) {

  }
}


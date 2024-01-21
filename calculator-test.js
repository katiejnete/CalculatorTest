describe('calculateMonthlyPayment tests', function () {
  it('should calculate the monthly rate correctly', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 11800,
      years: 2,
      rate: .1
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toEqual('6799.05');
  });

  it('should calculate the monthly rate correctly', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 38990,
      years: 4,
      rate: .05
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toEqual('10995.64');
  });

  it('should return a result with 2 decimal places', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 11800,
      years: 2,
      rate: .1
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toBeCloseTo('6799.05',2);
  });

  it('should return a result with 2 decimal places', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 38990,
      years: 4,
      rate: .05
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toBeCloseTo('10995.64',2);
  });

  it('should return a string result', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 11800,
      years: 2,
      rate: .1
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toEqual(jasmine.any(String));
  });

  it('should return a string result', () => {
    const spanMock = document.createElement('span');
    spanMock.setAttribute('id','results');
    spanMock.innerText = 'number';
    const obj = {
      amount: 38990,
      years: 4,
      rate: .05
    };

    expect(calculateMonthlyPayment(obj, spanMock)).toEqual(jasmine.any(String));
  }); 
});
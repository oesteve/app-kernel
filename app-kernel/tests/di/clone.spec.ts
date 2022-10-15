import {Container, createDefinition, scopeContextTag} from '../../src/di/container'

class Counter {
  count = 0
  increment(){
    this.count++
  }
}


describe('Clone a container', () => {

  test("Global scope", () =>  {
    const counterDef = createDefinition(
        'my-definition',
        () => new Counter()
    );
    
    const a = new Container([counterDef])
    const b = a.clone()
    
    a.get(counterDef).increment()
    
    expect(a.get(counterDef).count).toEqual(1)
    expect(b.get(counterDef).count).toEqual(1)
  })

  test("Context scope", () =>  {
    const counterDef = createDefinition(
        'my-counter-service',
        () => new Counter(),
        [scopeContextTag]
    );
    
    const a = new Container([counterDef])
    const b = a.clone()
    
    a.get(counterDef).increment()
    
    expect(a.get(counterDef).count).toEqual(1)
    expect(b.get(counterDef).count).toEqual(0)
  })
})

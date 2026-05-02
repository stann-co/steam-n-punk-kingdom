ServerEvents.recipes(event => {
    // 1. Replace inputs
    event.replaceInput(
        {},
        'farmersdelight_extended:bread_slice',
        'someassemblyrequired:bread_slice' 
    )
    
    event.replaceInput(
        {},
        'farmersdelight_extended:toast', 
        'someassemblyrequired:toasted_bread_slice'
    ) 
    
    // 2. Replace outputs
    event.replaceOutput( 
        {}, 
        'farmersdelight_extended:bread_slice', 
        'someassemblyrequired:bread_slice' 
    ) 
    
    event.replaceOutput( 
        {}, 
        'farmersdelight_extended:toast', 
        'someassemblyrequired:toasted_bread_slice' 
    ) 
    
    // 3. Remove recipes 
    event.remove({ output: 'farmersdelight_extended:bread_slice' })
    event.remove({ output: 'farmersdelight_extended:toast' }) })


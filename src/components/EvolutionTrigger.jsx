function EvolutionTrigger({ trigger }) {
    const formatTrigger = () => {
      if (!trigger) return 'Initial Stage';
      if (trigger.trigger.name === 'level-up') return `Level ${trigger.min_level}`;
      if (trigger.trigger.name === 'use-item') return `Use ${trigger.item.name}`;
      return 'Special Condition';
    };
  
    return <p>{formatTrigger()}</p>;
  }
  
  export default EvolutionTrigger;
  
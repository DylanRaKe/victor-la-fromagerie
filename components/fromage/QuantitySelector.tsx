'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function QuantitySelector({ 
  min = 1, 
  max = 10, 
  value, 
  onChange, 
  disabled = false 
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className="h-10 w-10 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className="w-16 text-center h-10"
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className="h-10 w-10 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
} 
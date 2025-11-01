'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCreateStream } from '@/hooks/useStreamContract';
import { RATE_HELPERS, STREAM_TYPES, StreamType } from '@/lib/contracts';
import { formatWeiToEther, formatDuration } from '@/lib/utils';
import { Calculator, Clock, DollarSign, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateStreamForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [streamType, setStreamType] = useState<StreamType>('work');
  const [description, setDescription] = useState('');
  const [usdRate, setUsdRate] = useState('');

  const { createStream, isPending } = useCreateStream();

  // Calculate values
  const durationSeconds = duration ? parseInt(duration) * 3600 : 0; // Convert hours to seconds
  const amountWei = amount ? RATE_HELPERS.parseToWei(amount) : 0n;
  const flowRateWei = durationSeconds > 0 ? amountWei / BigInt(durationSeconds) : 0n;
  const flowRateUsd = flowRateWei > 0 ? RATE_HELPERS.weiSecondToUsdHour(flowRateWei) : 0;

  // Calculate amount from USD rate
  const handleUsdRateChange = (value: string) => {
    setUsdRate(value);
    if (value && duration) {
      const usdPerHour = parseFloat(value);
      const hours = parseFloat(duration);
      const totalUsd = usdPerHour * hours;
      const totalEth = totalUsd / 2000; // Assuming $2000 per ETH
      setAmount(totalEth.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount || !duration || !description) {
      return;
    }

    try {
      await createStream(
        recipient as `0x${string}`,
        durationSeconds,
        streamType,
        description,
        amountWei
      );
      
      // Reset form
      setRecipient('');
      setAmount('');
      setDuration('');
      setDescription('');
      setUsdRate('');
    } catch (error) {
      console.error('Failed to create stream:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-somnia-500" />
            <span>Create New Stream</span>
          </CardTitle>
          <CardDescription>
            Set up a real-time payment stream with per-second money flow
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stream Type Selection */}
            <div className="space-y-2">
              <Label>Stream Type</Label>
              <div className="flex space-x-2">
                {Object.entries(STREAM_TYPES).map(([key, config]) => (
                  <Button
                    key={key}
                    type="button"
                    variant={streamType === key ? "somnia" : "outline"}
                    onClick={() => setStreamType(key as StreamType)}
                    className="flex items-center space-x-2"
                  >
                    <span>{config.icon}</span>
                    <span>{config.name}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {STREAM_TYPES[streamType].description}
              </p>
            </div>

            {/* Recipient Address */}
            <div className="space-y-2">
              <Label htmlFor="recipient" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Recipient Address</span>
              </Label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Duration (hours)</span>
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="24"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="0.1"
                step="0.1"
              />
              {duration && (
                <p className="text-xs text-muted-foreground">
                  {formatDuration(durationSeconds)}
                </p>
              )}
            </div>

            {/* USD Rate (Helper) */}
            <div className="space-y-2">
              <Label htmlFor="usdRate" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>USD Rate per Hour (Optional)</span>
              </Label>
              <Input
                id="usdRate"
                type="number"
                placeholder="25.00"
                value={usdRate}
                onChange={(e) => handleUsdRateChange(e.target.value)}
                min="0"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Enter USD/hour to auto-calculate total amount
              </p>
            </div>

            {/* Total Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Total Amount (STT)</span>
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0"
                step="0.000001"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Description</span>
              </Label>
              <Input
                id="description"
                placeholder="e.g., Frontend development work"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Summary Card */}
            {amount && duration && (
              <Card className="bg-somnia-50 dark:bg-somnia-950/20 border-somnia-200 dark:border-somnia-800">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3 text-somnia-700 dark:text-somnia-300">
                    Stream Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Amount:</span>
                      <div className="font-mono font-semibold">{amount} STT</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-semibold">{formatDuration(durationSeconds)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Flow Rate:</span>
                      <div className="font-mono text-xs">
                        {formatWeiToEther(flowRateWei * 3600n, 6)} STT/hour
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">USD Rate:</span>
                      <div className="font-semibold">
                        ${flowRateUsd.toFixed(2)}/hour
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || !recipient || !amount || !duration || !description}
              className="w-full"
              variant="somnia"
              size="lg"
            >
              {isPending ? 'Creating Stream...' : 'Create Stream'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

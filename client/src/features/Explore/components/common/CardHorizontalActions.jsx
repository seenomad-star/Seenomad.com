import React from 'react';
import { Lock, Crown, Zap, Dices, Bell, Plus } from 'lucide-react';
import './CardHorizontalActions.css';

const CardHorizontalActions = ({
    onUnlock = () => { },
    onPremium = () => { },
    onClaimXP = () => { },
    onSpin = () => { },
    onAlert = () => { },
    onAdd = () => { },
    xpClaimed = false,
    hasAlert = false,
    inBucketList = false,
    hasSpun = false
}) => {
    const actions = [
        {
            icon: Zap,
            label: xpClaimed ? 'Claimed' : 'Claim XP',
            onClick: onClaimXP,
            type: 'dopamine',
            color: '#10b981',
            active: xpClaimed
        },
        {
            icon: Dices,
            label: hasSpun ? 'Spun!' : 'Spin & Win',
            onClick: onSpin,
            type: 'dopamine',
            color: '#ec4899',
            active: hasSpun
        },
        {
            icon: Bell,
            label: hasAlert ? 'Alert Set' : 'Price Alert',
            onClick: onAlert,
            type: 'retention',
            color: '#3b82f6',
            active: hasAlert
        },
        {
            icon: Plus,
            label: inBucketList ? 'Added' : 'Bucket List',
            onClick: onAdd,
            type: 'retention',
            color: '#64748b',
            active: inBucketList
        }
    ];

    return (
        <div className="card-horizontal-actions">
            {actions.map((action, index) => (
                <button
                    key={index}
                    className={`horizontal-action-btn ${action.type} ${action.active ? 'active' : ''}`}
                    onClick={action.onClick}
                    title={action.label}
                    style={action.active ? { borderColor: action.color, background: `${action.color}20`, color: action.color } : {}}
                >
                    <action.icon size={16} color={action.active ? action.color : action.color} fill={action.active ? action.color : 'none'} />
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
};

export default CardHorizontalActions;

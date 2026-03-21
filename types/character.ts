
import { MemoryFragment, SpriteConfig, SkinSet, UserImpression } from './chat';
import { RoomItem, RoomGeneratedState } from './room';
import { ChatTheme, BubbleStyle } from './chat';

// --- DATE APP TYPES ---
export interface DialogueItem {
    text: string;
    emotion?: string;
}

export interface DateState {
    dialogueQueue: DialogueItem[];
    dialogueBatch: DialogueItem[];
    currentText: string;
    bgImage: string;
    currentSprite: string;
    isNovelMode: boolean;
    timestamp: number;
    peekStatus: string;
}

export interface SpecialMomentRecord {
    content: string;
    timestamp: number;
    source?: 'generated' | 'migrated';
}

export interface PhoneCustomApp {
    id: string;
    name: string;
    icon: string;
    color: string;
    prompt: string;
}

export interface PhoneEvidence {
    id: string;
    type: 'chat' | 'order' | 'social' | 'delivery' | string;
    title: string;
    detail: string;
    timestamp: number;
    systemMessageId?: number;
    value?: string;
    shop?: string;  // Store/shop name (used by Taobao order cards)
}

export interface Worldbook {
    id: string;
    title: string;
    content: string;
    category: string;
    position?: 'top' | 'after_worldview' | 'after_impression' | 'bottom';
    createdAt: number;
    updatedAt: number;
}

export interface GroupProfile {
    id: string;
    name: string;
    members: string[];
    avatar?: string;
    createdAt: number;
}

export interface MoodState {
    mood: string;           // 情绪词 (2-4字): "委屈", "放松", "心动"
    intensity: number;      // 1-10 情绪强度
    cause: string;          // 情绪原因 (15字以内)
    innerVoice: string;     // 心声: 角色心里想但没说出口的话
    unresolved?: string;    // 未解决的事 (15字以内)
    roundCount: number;     // 当前情绪已持续几轮
    updatedAt: number;      // 上次更新时间戳
}

export interface CharacterProfile {
    id: string;
    name: string;
    avatar: string;
    description: string;
    systemPrompt: string;
    worldview?: string;
    memories: MemoryFragment[];
    refinedMemories?: Record<string, string>;
    activeMemoryMonths?: string[];

    writerPersona?: string;
    writerPersonaGeneratedAt?: number;

    mountedWorldbooks?: { id: string; title: string; content: string; category?: string; position?: 'top' | 'after_worldview' | 'after_impression' | 'bottom'; vectorized?: boolean }[];

    impression?: UserImpression;

    bubbleStyle?: string;
    chatBackground?: string;
    contextLimit?: number;
    hideSystemLogs?: boolean;
    hideBeforeMessageId?: number;

    dateBackground?: string;
    sprites?: Record<string, string>;
    spriteConfig?: SpriteConfig;
    customDateSprites?: string[]; // User-added custom emotion names for date mode (per-character)
    dateLightReading?: boolean;   // Light reading mode for novel/text view in date
    dateSkinSets?: SkinSet[];     // Multiple skin sets for portrait mode
    activeSkinSetId?: string;     // Currently active skin set ID

    savedDateState?: DateState;
    specialMomentRecords?: Record<string, SpecialMomentRecord>;

    // 小红�?per-character toggle
    xhsEnabled?: boolean;

    socialProfile?: {
        handle: string;
        bio?: string;
    };

    roomConfig?: {
        bgImage?: string;
        wallImage?: string;
        floorImage?: string;
        items: RoomItem[];
        wallScale?: number;
        wallRepeat?: boolean;
        floorScale?: number;
        floorRepeat?: boolean;
    };

    lastRoomDate?: string;
    savedRoomState?: RoomGeneratedState;

    phoneState?: {
        records?: PhoneEvidence[];
        customApps?: PhoneCustomApp[];
    };

    // Vector Memory System
    vectorMemoryEnabled?: boolean;           // Master toggle (off = original mode)
    vectorMemoryAutoExtract?: boolean;       // Auto-extract (default true)
    vectorMemoryExtractInterval?: number;    // Extract interval in messages (default 30)
    vectorMemoryLastExtractAt?: number;      // Last extracted message ID
    vectorMemoryTakeover?: boolean;          // @deprecated — use vectorMemoryMode instead
    vectorMemoryMode?: 'traditional' | 'hybrid' | 'vector';  // Three-tier mode (default: 'hybrid')

    // Character State Bar (心智快照)
    moodState?: MoodState;                     // Current emotional state with decay
}

export interface CharacterExportData extends Omit<CharacterProfile, 'id' | 'memories' | 'refinedMemories' | 'activeMemoryMonths' | 'impression' | 'vectorMemoryEnabled' | 'vectorMemoryAutoExtract' | 'vectorMemoryExtractInterval' | 'vectorMemoryLastExtractAt' | 'vectorMemoryTakeover' | 'vectorMemoryMode' | 'moodState'> {
    version: number;
    type: 'sully_character_card';
    embeddedTheme?: ChatTheme;
}

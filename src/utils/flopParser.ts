interface FlopData {
  board: string;
  boardWithSuits: string;
  frequency: number;
}

// Raw flop data from PIOSolver 95-flop subset
const FLOP_DATA_RAW = `2s2d4c:2.15
3s3dJs:2.08
4s4dQc:1.75
5s5d6s:1.45
5s5dTc:1.12
6s6dQc:1.84
7s7d9c:1.77
7s7dKs:2.37
8s8d7c:1.82
9s9dKc:2.06
JsJd9s:1.29
QsQd2s:2.96
KsKd7c:1.98
AsAd2s:1.82
AsAd5s:1.7
2s3d9c:1.16
2s3dTc:2.39
2s4d6c:2.62
2s4s9s:1.42
2s4sKd:1.66
2s5s6d:1.43
2s5s8d:2.64
2s5d9c:2.69
2s6sTd:2.61
2s7sJs:1.64
2s7dKs:2.59
2s8sTs:0.76
2d8sKs:1.51
2s8dAc:0.34
2sTdJc:1.55
2sTdQc:2.5
2sJdKc:1.92
3s4s8d:1.8
3s4d9s:2.54
3d4sJs:2.03
3d5s8s:2.27
3s5dQc:1.14
3s5sAd:2.09
3s6s7d:2.95
3s6dAc:1.68
3s6sAs:1.11
3s7s8d:0.79
3s7sQd:1.83
3s7dAc:2.32
3s9dTc:1.91
3d9sKs:0.65
3sTsQd:2.23
3sJdKc:2.61
3sJsKs:1.53
3sJdAs:1.67
4s5s8d:0.97
4d5sJs:2.62
4s5sAd:2.07
4s7sTd:3.61
4s7dQc:1.05
4s7dAc:1.43
4s8dTc:3.21
4s8dKc:1.02
4s8sAs:1.71
4s9dJc:0.07
4s9dQs:2.61
4dJsAs:0.35
4sQsKd:1.62
5s6dKc:3.09
5d7s8s:2.2
5s7s9s:2.08
5d7sAs:2.65
5s9dTs:2.28
5d9sTs:1.16
5sTsQs:1.14
5sJdQc:3.27
6s7dQs:0.99
6s8dJc:4.1
6d8sJs:0.7
6s8sJs:0.92
6s8sQs:2.16
6s9dKc:0.16
6s9dKs:1.44
6d9sKs:2.35
6s9dAs:1.99
6sTdQc:1.2
6sTsQd:1.11
6sTdAc:1.48
6sQdAc:1.61
7d8s9s:1.5
7s8dJc:1.18
7s9dJc:2.74
7dTsJs:2.27
8s9dAc:3.11
8sJdAc:2.23
8dQsKs:3.35
9sQsAs:2.32
TsQdKs:1.67
TsKdAc:2.75
QsKdAc:2.05`;

export function parseFlopData(): FlopData[] {
  return FLOP_DATA_RAW
    .trim()
    .split('\n')
    .map(line => {
      const [board, frequencyStr] = line.split(':');
      return {
        board: formatBoardDisplay(board),
        boardWithSuits: formatBoardWithSuits(board),
        frequency: parseFloat(frequencyStr)
      };
    })
    .sort((a, b) => {
      // Sort by rank combination
      const rankOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
      
      // Extract ranks from board strings (remove texture info)
      const getRanks = (board: string): string => {
        return board.replace(/ \(.*\)/, '');
      };
      
      const ranksA = getRanks(a.board);
      const ranksB = getRanks(b.board);
      
      // Compare each position
      for (let i = 0; i < Math.max(ranksA.length, ranksB.length); i++) {
        const rankA = ranksA[i] || 'Z'; // Use 'Z' as lowest if string is shorter
        const rankB = ranksB[i] || 'Z';
        
        const indexA = rankOrder.indexOf(rankA);
        const indexB = rankOrder.indexOf(rankB);
        
        // If rank not found, put it at the end
        const orderA = indexA === -1 ? 999 : indexA;
        const orderB = indexB === -1 ? 999 : indexB;
        
        if (orderA !== orderB) {
          return orderA - orderB;
        }
      }
      
      return 0;
    });
}

function formatBoardDisplay(board: string): string {
  // Parse the board string into individual cards and extract ranks and suits
  const suits: { [key: string]: string } = {
    's': 's',
    'h': 'h', 
    'd': 'd',
    'c': 'c'
  };
  
  const cards: Array<{rank: string, suit: string}> = [];
  let i = 0;
  
  while (i < board.length) {
    const rank = board[i];
    const suit = board[i + 1];
    
    if (rank && suit && suits[suit]) {
      cards.push({rank, suit});
      i += 2;
    } else {
      i++;
    }
  }
  
  // Sort cards from highest to lowest rank
  const rankOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  cards.sort((a, b) => {
    return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
  });
  
  // Determine texture
  const uniqueSuits = new Set(cards.map(card => card.suit));
  let texture = '';
  if (uniqueSuits.size === 1) {
    texture = ' (Monotone)';
  } else if (uniqueSuits.size === 2) {
    texture = ' (Two-tone)';
  } else {
    texture = ' (Rainbow)';
  }
  
  // Format as ranks only with texture
  const ranksOnly = cards.map(card => card.rank).join('');
  return ranksOnly + texture;
}

// Create a function to get the board with suits for display
export function formatBoardWithSuits(board: string): string {
  const suits: { [key: string]: string } = {
    's': '♠',
    'h': '♥', 
    'd': '♦',
    'c': '♣'
  };
  
  const cards: Array<{rank: string, suit: string}> = [];
  let i = 0;
  
  while (i < board.length) {
    const rank = board[i];
    const suit = board[i + 1];
    
    if (rank && suit && suits[suit]) {
      cards.push({rank, suit: suits[suit]});
      i += 2;
    } else {
      i++;
    }
  }
  
  // Sort cards from highest to lowest rank
  const rankOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  cards.sort((a, b) => {
    return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
  });
  
  // Format with actual suit symbols
  return cards.map(card => card.rank + card.suit).join(' ');
}

export function getBoardTexture(board: string): string {
  // Extract texture from the board string
  if (board.includes('(Monotone)')) {
    const ranks = board.replace(' (Monotone)', '');
    const hasPair = hasDuplicateRanks(ranks);
    return hasPair ? 'Paired Monotone' : 'Unpaired Monotone';
  } else if (board.includes('(Two-tone)')) {
    const ranks = board.replace(' (Two-tone)', '');
    const hasPair = hasDuplicateRanks(ranks);
    return hasPair ? 'Paired Two-tone' : 'Unpaired Two-tone';
  } else if (board.includes('(Rainbow)')) {
    const ranks = board.replace(' (Rainbow)', '');
    const hasPair = hasDuplicateRanks(ranks);
    return hasPair ? 'Paired Rainbow' : 'Unpaired Rainbow';
  }
  
  return 'Unknown texture';
}

function hasDuplicateRanks(ranks: string): boolean {
  const rankCounts: Record<string, number> = {};
  for (const rank of ranks) {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  }
  return Object.values(rankCounts).some(count => count >= 2);
}
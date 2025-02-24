export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  pm?: string;
  isFavorite?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'Lorem ipsum dolor sit amet.',
    startDate: '2023-01-01',
    endDate: '2023-06-01',
    pm: 'John Doe',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'Consectetur adipiscing elit.',
    startDate: '2023-02-10',
    endDate: '2023-07-20',
    pm: 'Jane Smith',
    isFavorite: false,
  },
];

// Delay and error injection
function randomDelay() {
  // Delay 2 seconds
  return new Promise(resolve => setTimeout(resolve, 2000));
}

function maybeThrowRandomError() {
  // 20% chance of throwing an error
  if (Math.random() < 0.2) {
    throw new Error('Random mock API error occurred!');
  }
}

export async function simulateNetworkConditions() {
  await randomDelay();
  maybeThrowRandomError();
}

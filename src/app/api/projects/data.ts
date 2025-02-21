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

// Random delay and error injection
function randomDelay() {
  // Delay between 0 and 2 seconds
  const delay = Math.floor(Math.random() * 2000);
  return new Promise(resolve => setTimeout(resolve, delay));
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

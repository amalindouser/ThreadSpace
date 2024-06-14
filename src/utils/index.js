import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

function postedAt(date) {
  const postedDate = new Date(date);
  return formatDistanceToNow(postedDate, { addSuffix: true, locale: enUS });
}

export default postedAt;

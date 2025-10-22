import type { Point } from "../types";

export function perpendicularDistance(
  point: Point,
  lineStart: Point,
  lineEnd: Point
): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const normSquared = dx * dx + dy * dy;

  if (normSquared === 0) {
    const px = point.x - lineStart.x;
    const py = point.y - lineStart.y;
    return Math.sqrt(px * px + py * py);
  }

  const crossProduct =
    dy * point.x -
    dx * point.y +
    lineEnd.x * lineStart.y -
    lineEnd.y * lineStart.x;
  return Math.abs(crossProduct) / Math.sqrt(normSquared);
}

export function simplifyPath(points: Point[], tolerance: number = 2): Point[] {
  if (points.length <= 2) return points;

  const stack: [number, number][] = [[0, points.length - 1]];
  const keep = new Set<number>([0, points.length - 1]);

  while (stack.length > 0) {
    const [start, end] = stack.pop()!;
    let maxDistance = 0;
    let maxIndex = start;

    const startPoint = points[start];
    const endPoint = points[end];

    for (let i = start + 1; i < end; i++) {
      const distance = perpendicularDistance(points[i], startPoint, endPoint);
      if (distance > maxDistance) {
        maxDistance = distance;
        maxIndex = i;
      }
    }

    if (maxDistance > tolerance) {
      keep.add(maxIndex);
      stack.push([start, maxIndex], [maxIndex, end]);
    }
  }

  return points.filter((_, i) => keep.has(i));
}

const PATH_REGEX = /[ML]([\d.-]+),([\d.-]+)/g;

export function pathToPoints(pathString: string): Point[] {
  const points: Point[] = [];
  let match;

  PATH_REGEX.lastIndex = 0; // Reset regex state

  while ((match = PATH_REGEX.exec(pathString)) !== null) {
    points.push({
      x: parseFloat(match[1]),
      y: parseFloat(match[2]),
    });
  }

  return points;
}

export function pointsToPath(points: Point[]): string {
  if (points.length === 0) return "";

  const parts: string[] = [`M${points[0].x},${points[0].y}`];

  for (let i = 1; i < points.length; i++) {
    parts.push(`L${points[i].x},${points[i].y}`);
  }

  return parts.join("");
}
